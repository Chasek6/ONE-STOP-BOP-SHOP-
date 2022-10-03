import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Account() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/vinyls">← Back to Products</Link>

        {user ? (
          <>
            {user.orders.length ? (
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
                {user.orders.map((order) => (
                <div key={order._id} className="my-2">
                    <h3>
                    {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                    </h3>
                    <div className="flex-row">
                    {order.products.map(({ _id, image, name, price }, index) => (
                        <div key={index} className="card px-1 py-1">
                        <Link to={`/products/${_id}`}>
                            <img alt={name} src={`/images/${image}`} />
                            <p>{name}</p>
                        </Link>
                        <div>
                            <span>${price}</span>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))})
            : (
            <Container sx={{m:5}} justify="center" align="center">
            <Typography
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{fontFamily: 'monospace', fontWeight: 700}}
            >
                Your Account:
            </Typography>
            </Container>
            )}
            
          </>
        ) : null}
      </div>
    </>
  );
}

export default Account;
