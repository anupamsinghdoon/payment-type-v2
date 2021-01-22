// This is your new function. To start, set the name and path on the left.

exports.greeting = async function (context, event, callback) {
  try {
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);

    Remember.task_fail_counter = 0;
    Remember.repeat = false;
    Remember.transfer_agent = false;
    // this update from VS code.
    // const payment_type = event.Field_payment_type_Value;

    let userTotalBalance = 800.50; // Default Amount for testing
    if (Memory.userTotalBalance != undefined)
      userTotalBalance = Number(Memory.userTotalBalance).toFixed(2);
    console.log("userTotalBalance: " + userTotalBalance);
    Remember.userTotalBalance = userTotalBalance;

    //Say = `you can pay your full balance of $${userTotalBalance}, or you can make a partial payment or you can make a payment arranagement. Let us know what would you prefer.`;
    //Redirect = 'task://payment_full';
    Say = `To pay your full balance of $${userTotalBalance} say full or press 1, or
            to make a payment less than $${userTotalBalance} say partail or press 2
            to make a payment arranagement say arrangement or press 3.`;
    Listen = {
      "voice_digits": {
        "num_digits": 1,
        "finish_on_key": "#",
        "redirects": {
          1:"task://payment_full",        
          2: "task://payment_partial",
          3: "task://payment_arrangement"
        }
      }
    };

    // Listen = true;
     Tasks=['payment_Full','payment_partial', 'payment_arrangement','agent_transfer'];


    //End of your code.

    // This callback is what is returned in response to this function being invoked.
    const functions = Runtime.getFunctions();
    let path = functions['responseBuilder'].path;
    //console.log("path:"+path);
    let RB = require(path);
    await RB.responseBuilder(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);

  } catch (error) {
    console.error(error);
    callback(error);
  }
};
