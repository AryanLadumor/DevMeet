const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/ConnectionRequest.js");
const sendEmail = require("./sendEmail.js");

cron.schedule(" 08 13 * * * ", async () => {
  try {
    //Fetching the yesterday start and end time i.e. 00:00 and 23:59
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);



    ///finding all requests that are being interrested yesterday
    const pendingRequest = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    console.log(pendingRequest)

    //filtering all unquie email to whom req is sended and putting them into a list
    const listOfEmails = new Set(
      pendingRequest.map((req) => req.toUserId.emailId),
    );
    console.log(listOfEmails);
    for (const email of listOfEmails) {
      try {
        //Sending the email
        const emailObj = {
          subject: "New Friend Request pendin for " + email,
          msg: "please login to patner.xyz and accept or reject it",
        };
        const res = await sendEmail.run(emailObj);

        console.log(res);
      } catch (error) {
        console.log(error)
      }
    }
  } catch (error) {
    console.log(error);
  }
});
