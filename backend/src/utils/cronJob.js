const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");

const ConnectionRequest = require("../models/connectionRequest.model");
const sendEmail = require("./sendEmail");

cron.schedule("48 18 * * *", async () => {
  try {
    const today = subDays(new Date(), 0);

    const todayStartDay = startOfDay(today);
    const todayEndDay = endOfDay(today);

    console.log(
      "today: " + today,
      "today start day of time:" + todayStartDay,
      "today end of day of time" + todayEndDay,
    );

    const pendingConnectionsRequest = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: todayStartDay,
        $lt: todayEndDay,
      },
    }).populate("fromUserId toUserId");

    console.log(pendingConnectionsRequest);

    if (pendingConnectionsRequest === 0) {
      return res.status(404).json({
        message: "connections request does not found",
      });
    }

    // mapping pending connections request to interested user's email id to send remainder email about pending request
    const listOfEmails = [
      ...new Set(pendingConnectionsRequest.map((req) => req.toUserId.email)),
    ];

    console.log(listOfEmails);

    // const sender = [
    //   ...new Set(pendingConnectionsRequest.map((req) => req.fromUserId)),
    // ];

    // console.log(sender);

    for (const email of listOfEmails) {
      try {
        const emailResponseSent = await sendEmail.run(
          `A pending friend request remainder from ${email}`,
          `A friend request is pending. Please login techDevTinder.space and accepted or reject it.`,
        );
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});
