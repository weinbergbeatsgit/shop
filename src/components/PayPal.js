import React, { useRef, useEffect } from "react";

const PayPal = props => {
  const paypal = useRef();

  useEffect(() => {
        window.paypal
      .Buttons({

        onInit: function(data, actions) {
          if(props.disable){
            actions.disable();
          }

          document.getElementById('agb').addEventListener('change', function(event) {
            if (event.target.checked) {
              actions.enable();
            } else {
              actions.disable();
            }
          });
        },
        onClick: function() {
          if (!document.getElementById('agb').checked) {
            document.getElementById('agb-label').classList.add('error');
          } else{
            document.getElementById('agb-label').classList.remove('error');
          }
    
        },
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "EUR",
                  value: props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log("Finish order" + order);
          props.finishOrder();
        },
        onError: (err) => {
          console.log("Cancel order" + err);
          props.cancelOrder();
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}

export default PayPal