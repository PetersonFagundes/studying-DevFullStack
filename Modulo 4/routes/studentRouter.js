import express from 'express';
import { studentModel } from '../models/student.js';

const app = express();

app.get('/account', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/saldo/:agencia/:conta', async (req, res) => {
  try {
    const student = await studentModel.findOne(
      {
        agencia: req.params.agencia,
        conta: req.params.conta,
      },
      { _id: 0, balance: 1 }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/account', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/account/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({ _id: req.params.id });
    if (!student) {
      res.status(404).send('Documento nao encontra na colecao');
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/account/:agencia/:conta', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });

    if (!student) {
      res.status(404).send('Documento nao encontra na colecao');
    }

    const countContas = await studentModel
      .where({ agencia: req.params.agencia })
      .count();

    res.status(200).send({ contasAtivas: countContas });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/account/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/depositar/:agencia/:conta/:value', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { agencia: req.params.agencia, conta: req.params.conta },
      { $inc: { balance: req.params.value } },
      { new: true }
    );

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/sacar/:agencia/:conta/:value', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { agencia: req.params.agencia, conta: req.params.conta },
      { $inc: { balance: (parseInt(req.params.value) + 1) * -1 } },
      { new: true }
    );

    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/transferir/:contaDe/:contaPara/:value', async (req, res) => {
  try {
    const contaDe = await studentModel.find(
      { conta: req.params.contaDe },
      { _id: 0, agencia: 1 }
    );
    const contaPara = await studentModel.find(
      { conta: req.params.contaPara },
      { _id: 0, agencia: 1 }
    );

    let desconto = parseInt(req.params.value);
    if (JSON.stringify(contaDe) !== JSON.stringify(contaPara)) {
      desconto += 8;
      //res.status(404).send([contaDe, contaPara]);
    }

    const contaOrigem = await studentModel.findOneAndUpdate(
      { conta: req.params.contaDe },
      { $inc: { balance: desconto * -1 } },
      { new: true }
    );

    const contaDestino = await studentModel.findOneAndUpdate(
      { conta: req.params.contaPara },
      { $inc: { balance: req.params.value } },
      { new: true }
    );

    res.send([contaOrigem, contaDestino]);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/mean/:agencia', async (req, res) => {
  try {
    const meanAg = await studentModel.aggregate([
      {
        $group: {
          _id: '$agencia',
          averageQt: { $avg: '$balance' },
        },
      },
    ]);
    res.send({ meanAg });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/min/:limit', async (req, res) => {
  try {
    const meanAg = await studentModel.aggregate([
      { $sort: { balance: 1 } },
      { $limit: parseInt(req.params.limit) },
    ]);
    res.send({ meanAg });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/max/:limit', async (req, res) => {
  try {
    const meanAg = await studentModel.aggregate([
      { $sort: { balance: -1 } },
      { $limit: parseInt(req.params.limit) },
    ]);
    res.send({ meanAg });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/privateCount', async (req, res) => {
  try {
    const meanAg = await studentModel.aggregate([
      {
        $group: {
          _id: { agencia: '$agencia' },
        },
      },
      { $sort: { agencia: -1 } },
      // { $project: { _id: 0, agencia: 1, conta: 1, balance: 1 } },
    ]);

    let val = [];
    let contaUpdate;
    meanAg.forEach(async (ag) => {
      const maiorValor = await studentModel.aggregate([
        { $match: { agencia: ag._id.agencia } },
        // { $project: { _id: 0, agencia: 1, conta: 1, balance: 1 } },
        { $sort: { balance: -1 } },
        { $limit: 1 },
      ]);
      //console.log(maiorValor);
      val.push(maiorValor);
      contaUpdate = await studentModel.findOneAndUpdate(
        { agencia: maiorValor[0].agencia, conta: maiorValor[0].conta },
        { agencia: 99 },
        { new: true }
      );
    });

    contaUpdate = await studentModel.find({ agencia: 99 });

    res.send(contaUpdate);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as studentRouter };
