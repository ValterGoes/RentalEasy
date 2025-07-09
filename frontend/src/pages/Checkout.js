import { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const Checkout = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE_URL}/api/payment`, { name, cardNumber, expiry, cvc })
      .then((res) => alert('Payment successful!'))
      .catch((err) => alert('Error processing payment.'));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Checkout</h2>

        <input
          type="text"
          required
          placeholder="Name on card"
          className="w-full p-3 border rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          required
          placeholder="Card number"
          className="w-full p-3 border rounded mb-4"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            required
            placeholder="MM/YY"
            className="w-1/2 p-3 border rounded"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="CVC"
            className="w-1/2 p-3 border rounded"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;