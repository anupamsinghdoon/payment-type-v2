// This is your new function. To start, set the name and path on the left.

exports.payment_full = async function (context, event, callback) {
  try {
    let Say;
    let Prompt;
    let Listen = true;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);

    Remember.repeat = false;
    Remember.question = "payment_full";
    Remember.payment_type = 1;
    Remember.task_fail_counter = 0;
    //Say = "Are you able to pay balance in full, say yes or No. you can also press 1 for yes and 2 for no.";
    //Redirect="task://payment_full";
    
    Remember.payment_amount = Memory.userTotalBalance;
    Say = "You have selected to pay your full balance.";
    Listen = false;
    // Listen = {
    //   "voice_digits": {
    //     "num_digits": 1,
    //     "finish_on_key": "#",
    //     "redirects": {
    //       1: "task://collect_partial_Amount",
    //       2: "task://partial_yes_no"
    //     }
    //   }
    // };
    //Tasks=['payment_Method'];

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
