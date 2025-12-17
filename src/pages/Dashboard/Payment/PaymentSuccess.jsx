import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {

  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Processing payment...");
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setMessage(res.data.message);
          setPaymentInfo(res.data.paymentInfo);
          setLoading(false);
        })
        .catch(() => {
          setMessage("Something went wrong");
          setLoading(false);
        })
    }
  }, [sessionId, axiosSecure]);

  if (loading) return <p>Loading payment details...</p>;

  return (
    <div className='p-5'>
      <h1 className='text-2xl font-bold mb-3'>Payment Result</h1>
      <p className={`text-lg font-semibold ${message.includes("already")
        ? "text-orange-500"
        : message.includes("successful")
          ? "text-green-600"
          : "text-red-500"
        }`}
      >
        {message}
      </p>

      {paymentInfo && (
        <div className='mt-5 border p-4 rounded shadow-md'>
          <p><strong>Contest:</strong> {paymentInfo.contestName}</p>
          <p><strong>Amount:</strong> ${paymentInfo.amount} {paymentInfo.currency.toUpperCase()}</p>
          <p><strong>Tracking ID:</strong> {paymentInfo.trackingId}</p>
          <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
          <p><strong>Paid At:</strong> {new Date(paymentInfo.paidAt).toLocaleString()}</p>
          <p><strong>Status:</strong> {paymentInfo.paymentStatus}</p>
        </div>
      )}
    </div>
  )
}

export default PaymentSuccess;
