import dayjs from "dayjs";

import {createRequire} from "module";
const require = createRequire(import.meta.url);
const { serve } = require('@upstash/workflow/express') // import wont work thats why we use createRequire

import Subscription from "../models/subscription.model";

const REMINDERS = [7,5,2,1];

// create a funstion which will be responsible sending reminders
export const sendReminders = serve(async (context) => {

    const {subscriptionId} = context.requestPayload; // when we trigger a specific workflow, we will pass the id of the subscription that workflow is for

    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return; // exit out of this function

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) { //dayjs() : returns current date
        console.log(`Renewal date has passsed for subscription ${subscriptionId}. Stopping the workflow..`);
        return;
    }

    // if the subscription is active and the renewal date is in the future, we will send reminders
    for ( const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        /**Example:
         * renewal date = 22 feb,
         * reminder date = 15 feb, 17 feb, 20 feb, 21 feb
         */

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context,`Reminder ${daysBefore} days before`, reminderDate);
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

// ------------------------------HELPER FUNCTIONS-----------------------------

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run('get subscription', () => {
        return Subscription.findById(subscriptionId).populate('user','name email');
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async ( context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
        // Send email, SMS, push notification...
    })
}