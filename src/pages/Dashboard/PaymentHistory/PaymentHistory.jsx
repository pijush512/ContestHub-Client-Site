import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`)
      return res.data;
    }
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h2 className="text-center font-bold text-4xl">Payment History : {payments.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Amount</th>
              <th>TransactionId</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>

                  <td>
                    <p className="font-semibold">{payment.contestName}</p>
                    <p className="text-xs text-gray-500">{payment.trackingId}</p>
                  </td>

                  <td>
                    ${payment.amount} {payment.currency?.toUpperCase()}
                  </td>

                  <td>{payment.transactionId}</td>

                  <td>
                    {new Date(payment.registeredAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory
