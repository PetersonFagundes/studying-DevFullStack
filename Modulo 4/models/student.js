import mongoose from 'mongoose';

const studentSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    //Valida se a nota inserida e' menor que zero
    validate(value) {
      if (value <= 0) throw new Error('Valor negativo para nota');
    },
  },
});

const studentModel = mongoose.model('accounts', studentSchema, 'accounts');

export { studentModel };
