import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const Payment = () => {

  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const { data: contest, isLoading } = useQuery({
    queryKey: ['contest', contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${contestId}`);
      return res.data;
    }
  });

  const handlePayment = async () => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      userEmail: user.email,
      contestName: contest.name
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  }

  if (isLoading) {
    return <p> Payment Loading...</p>
  }

  return (
    <div>
      <h2>Plase pay for ${contest.price} : {contest.name}</h2>
      <button
        onClick={handlePayment}
        className='btn btn-primary'>Pay</button>
    </div>
  )
}

export default Payment
