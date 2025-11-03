# Onboarding

One of the biggest challenges to blockchain is onboarding. Usually requiring complex interactions and obtaining gas fees before you can begin with interaction. For a messaging service, the main goal for onboarding is to get people using the chat functionality.

However, there is a payoff involved with these mechanisms:

- **Gas fee**: Difficult onboarding requirement, less users.
- **No Gas fee**: Easy onboarding, blockchain open to DDOS and overloading.

To solve this issue we are looking specifically at the mechanism for new users creating an identity for the first time (the only thing required for initial messaging):

**Low gas fees for registration**

Gas fees for user registration must be low.

**Service Node Registration Sponsership**

Service nodes can sponser the initial transactions.

**POS/POA**

Service nodes generate tokens based on Proof of stake and Proof of availability, if a service is experiencing high user demand they can increase their reward by defining a percentage of reward as (locked for gas). Meaning this is only to be used for new user registrations.

**POW requirement**

A new user is required to submit a small piece of POW in exchange for lower gas fees on this particular transaction. This will also prevent network overloading.

**Bootstrap support**

Service Nodes can apply for Moki Gas Fee Grants. These are grants for gas fee locked tokens, they can also be spoon fed to service nodes to ensure they are not malicious.


