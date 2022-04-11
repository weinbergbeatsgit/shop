import React, { useRef, useEffect } from "react";

const PayPal = props => {
  const paypal = useRef();
  const disable = props.disable;

  useEffect(() => {
    

    window.paypal
      .Buttons({

        onInit: function(data, actions) {
          console.log(disable);
          if(disable){
            actions.disable();
          }

          document.getElementById('agb')

          .addEventListener('change', function(event) {
  
  
            // Enable or disable the button when it is checked or unchecked
  
            if (event.target.checked) {
  
              actions.enable();
  
            } else {
  
              actions.disable();
  
            }
  
          });
        },
        onClick: function() {


          // Show a validation error if the checkbox is not checked
    
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
          props.finishOrder();
        },
        onError: (err) => {
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