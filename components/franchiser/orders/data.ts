const columns = [
    {name: "Location", uid: "location", sortable: true},
    {name: "Order Status", uid: "orderStatus", sortable: true},
    {name: "Date", uid: "date", sortable: true},
    {name: "Amount", uid: "amount", sortable: true},
];

const statusOptions = [
    {name: "Completed", uid: "completed"},
    {name: "Queue", uid: "queue"},
    {name: "Ready for Pickup", uid: "readyForPickup"},
    {name: "In Preparation", uid: "inPreparation"}
];

const users = [
    {
        id: 1,
        location: "New York",
        orderStatus: "completed",
        date: "2024-10-23",
        amount: "$150.00",
        email: "customer1@example.com"
    },
    {
        id: 2,
        location: "Los Angeles",
        orderStatus: "queue",
        date: "2024-10-22",
        amount: "$200.00",
        email: "customer2@example.com"
    },
    {
        id: 3,
        location: "Chicago",
        orderStatus: "in preparation",
        date: "2024-10-21",
        amount: "$75.00",
        email: "customer3@example.com"
    },
    {
        id: 4,
        location: "Houston",
        orderStatus: "completed",
        date: "2024-10-20",
        amount: "$100.00",
        email: "customer4@example.com"
    },
    {
        id: 5,
        location: "Phoenix",
        orderStatus: "queue",
        date: "2024-10-19",
        amount: "$125.00",
        email: "customer5@example.com"
    },
    {
        id: 6,
        location: "Philadelphia",
        orderStatus: "in preparation",
        date: "2024-10-18",
        amount: "$50.00",
        email: "customer4@example.com"
    },
    {
        id: 7,
        location: "San Antonio",
        orderStatus: "completed",
        date: "2024-10-17",
        amount: "$75.00",
        email: "customer4@example.com"
    },
    {
        id: 8,
        location: "San Diego",
        orderStatus: "completed",
        date: "2024-10-16",
        amount: "$130.00",
        email: "customer8@example.com"
    },
    {
        id: 9,
        location: "Dallas",
        orderStatus: "queue",
        date: "2024-10-15",
        amount: "$180.00",
        email: "customer9@example.com"
    },
    {
        id: 10,
        location: "San Jose",
        orderStatus: "in preparation",
        date: "2024-10-14",
        amount: "$60.00",
        email: "customer10@example.com"
    },
    {
        id: 11,
        location: "Austin",
        orderStatus: "completed",
        date: "2024-10-13",
        amount: "$200.00",
        email: "customer11@example.com"
    },
    {
        id: 12,
        location: "Jacksonville",
        orderStatus: "queue",
        date: "2024-10-12",
        amount: "$90.00",
        email: "customer12@example.com"
    },
    {
        id: 13,
        location: "San Francisco",
        orderStatus: "completed",
        date: "2024-10-11",
        amount: "$210.00",
        email: "customer13@example.com"
    },
    {
        id: 14,
        location: "Columbus",
        orderStatus: "in preparation",
        date: "2024-10-10",
        amount: "$40.00",
        email: "customer14@example.com"
    },
    {
        id: 15,
        location: "Fort Worth",
        orderStatus: "completed",
        date: "2024-10-09",
        amount: "$170.00",
        email: "customer15@example.com"
    },
    {
        id: 16,
        location: "Indianapolis",
        orderStatus: "queue",
        date: "2024-10-08",
        amount: "$110.00",
        email: "customer16@example.com"
    },
    {
        id: 17,
        location: "Charlotte",
        orderStatus: "in preparation",
        date: "2024-10-07",
        amount: "$30.00",
        email: "customer17@example.com"
    },
    {
        id: 18,
        location: "Seattle",
        orderStatus: "completed",
        date: "2024-10-06",
        amount: "$220.00",
        email: "customer18@example.com"
    },
    {
        id: 19,
        location: "Denver",
        orderStatus: "queue",
        date: "2024-10-05",
        amount: "$125.00",
        email: "customer19@example.com"
    },
    {
        id: 20,
        location: "Washington D.C.",
        orderStatus: "completed",
        date: "2024-10-04",
        amount: "$160.00",
        email: "customer20@example.com"
    }
];

export {columns, users, statusOptions};
