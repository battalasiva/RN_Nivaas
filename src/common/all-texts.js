export const  allTexts = {
  appVersion: {
    version: '1.3',
  },
  buttonTexts: {
    start: 'Start Now',
    sigup: ' Sign Up',
    login: 'Log In',
  },
  roles: {
    user: 'ROLE_USER',
    apartmentAdmin: 'ROLE_APARTMENT_ADMIN',
    flatOwner: 'ROLE_FLAT_OWNER',
    flatTenant: 'ROLE_FLAT_TENANT',
    familyMember: 'ROLE_FLAT_FAMILY_MEMBER',
  },
  headings: {
    // place all your Heading texts here
    discoverMore: 'Discover more at Nivaas',
    verfiyEmail: 'Verify your email Address',
    verfiyPhone: 'Verify your Mobile Number',
  },
  placeHolders: {
    fistNamePlace: 'Enter Your First Name',
    otpSend: 'Enter OTP sent to ',
    lastNamePlace: 'Enter Your last name',
    emailPlace: 'Enter Your email',
  },
  paragraphs: {
    discoverNivaas:
      'Discover Nivaas for comprehensive apartment management with features like maintenance management, and a centralized dashboard for real-time monitoring. ',
    accessAll: 'Access all importent announcements notices and cirulers here',
    itemPublished: 'No item published yet from your society',
    NoItemsText: ' No items to display at this time',
  },
  constants: {
    noInternet: 'Network Error!',
  },
  tabNames: {
    home: 'Home',
    apartments: 'Apartments',
    services: 'Services',
    search: 'search',
  },
  screenTitles: {},
  screenNames: {
    signup: 'Signup',
    signup2: 'Signup2',
    signin: 'Signin',
    bottomTab: 'BottomTab',
    otpScreen: 'OtpScreen',
    homeDetails: 'HomeDetails',
    home: 'Home',
    services: 'Services',
    userOnBoardingForm: 'UserOnBoardingForm',
    newApartmentOnBoard: 'NewApartmentOnBoard',
    myAccount: 'MyAccount',
    orders: 'Orders',
    addYourHome: 'AddYourHome',
    eachService: 'EachService',
    adminSociety: 'AdminSociety',
    prepaidMeter: 'PrepaidMeter',
    addPrepaidMeter: 'AddPrepaidMeter',
    maintainenceSettings: 'MaintainenceSettings',
    societyDues: 'SocietyDues',
    flatsOnboarding: 'FlatsOnboarding',
    notification: 'Notification',
    manageFlats: 'ManageFlats',
    expences: 'Expences',
    addNewExpances: 'AddNewExpances',
    coAdmin: 'CoAdmin',
    addNotice: 'AddNotice',
    requestSummary: 'RequestSummary',
    slidesPage: 'SlidesPage',
    editProfile: 'EditProfile',
    termsAndConditions: 'TermsAndConditions',
    addConsumptionUnits: 'AddConsumptionUnits',
    addService: 'AddService',
    eachServicelist: 'EachServicelist',
    slotBookingService: 'SlotBookingService',
    raiseRequest: 'RaiseRequest',
    faqScreen: 'FaqScreen',
    announcementsScreen:'AnnouncementsScreen',
    complaintsList:'ComplaintsList',
    coins:'Coins',
    subscription:'Subscription',
    redemptionDone:'RedemptionDone',
    rentSale:'RentSale',
    serviceProviders:'ServiceProviders',
  },
  months: [
    {name: 'January', index: 1},
    {name: 'February', index: 2},
    {name: 'March', index: 3},
    {name: 'April', index: 4},
    {name: 'May', index: 5},
    {name: 'June', index: 6},
    {name: 'July', index: 7},
    {name: 'August', index: 8},
    {name: 'September', index: 9},
    {name: 'October', index: 10},
    {name: 'November', index: 11},
    {name: 'December', index: 12},
  ],
  complaintStatusTypes : [
    {name: 'OPEN'},
    {name: 'IN_PROGRESS'},
    {name: 'RESOLVED'},
    {name: 'CLOSED'},
    {name: 'REJECTED'},
  ],
  serviceTypes : [
    {id:1,name: 'Electrition'},
    {id:2,name: 'Plumber'},
    {id:3,name: 'Repairs'},
    {id:4,name: 'Cleaning'},
    {id:5,name: 'Painting'},
  ],
  yesOrNo : [
    {id:1,name:'TRUE'},
    {id:2,name:'FALSE'}
  ],
  directions:[
    {id:1,name:'NORTH'},
    {id:2,name:'SOUTH'},
    {id:3,name:'EAST'},
    {id:4,name:'WEST'},
  ],
  subscriptionPlans : [
    {
        id: 1,
        duration: '1 Month',
        price: '₹49',
        coins: '2000',
        about: [
            "Access to basic content",
            "Limited customer support",
            "Ads included",
        ],
    },
    {
        id: 2,
        duration: '2 Months',
        price: '₹89',
        coins: '4000',
        about: [
            "Access to premium content",
            "Priority customer support",
            "Limited ads experience",
        ],
    },
    {
        id: 3,
        duration: '3 Months',
        price: '₹129',
        coins: '6000',
        about: [
            "Access to all content",
            "24/7 customer support",
            "No ads experience",
            "Exclusive discounts on services",
        ],
    },
],
  faqs: {
    prepaidMeterFaqs: [
      {
        id: 1,
        question: 'How do I view meter details?',
        answer:
          "To view the details of a specific meter, click on the meter name in the prepaid meter list. A popup will appear showing the meter's details, such as consumption and cost per unit.",
      },
      {
        id: 2,
        question: 'How can I edit meter details?',
        answer:
          'Once you open the meter details by clicking on the meter name, you will see an edit icon. Click on the edit icon to make changes to the meter details, such as units consumed and cost per unit.',
      },
      {
        id: 3,
        question: 'How do I add consumption for a flat?',
        answer:
          "In the meter details popup, there is an 'Add' button for each flat listed under the meter. Click on the 'Add' button next to the respective flat to enter the consumption units and submit the updated data.",
      },
      {
        id: 4,
        question:
          'Can I track consumption for multiple flats under the same meter?',
        answer:
          'Yes, each meter can track consumption for multiple flats. In the meter details popup, you will see a list of flats and their consumption under that specific meter.',
      },
      {
        id: 5,
        question: 'What happens after I update the consumption details?',
        answer:
          "After you update the consumption details, the changes will be reflected in the meter's details for the respective flat. The total amount will be recalculated based on the updated consumption and cost per unit.",
      },
    ],
    maintainenceFaqs:
      [
        {
          id: 1,
          question: "How do I add maintenance for an apartment?",
          answer: "To add maintenance, select the apartment from the list. Choose the prepaid meters using the checkboxes, enter any fixed costs manually, and then click the 'Save' button. The dues will be generated for the selected date."
        },
        {
          id: 2,
          question: "How are dues generated?",
          answer: "Dues are generated based on the selected prepaid meters' consumption and the fixed cost entered manually. Once you click 'Save,' the dues will be automatically calculated and saved for the selected date."
        },
        {
          id: 3,
          question: "Can I add both fixed and dynamic costs?",
          answer: "Yes, you can add both dynamic costs from the prepaid meters and fixed costs by entering the amount manually. The total dues will be a combination of both."
        },
        {
          id: 4,
          question: "What happens after I save maintenance details?",
          answer: "After saving, the dues for the selected apartment will be stored, and the details for the last entered maintenance will automatically appear when you revisit the page."
        },
        {
          id: 5,
          question: "Can I see the last entered maintenance details?",
          answer: "Yes, when you open the maintenance page, the last entered details, including selected prepaid meters and fixed costs, will automatically populate based on the most recent entry."
        }
      ],
      expenceFaq:[
        {
          id: 1,
          question: "How can I add expenses?",
          answer: "To add an expense, click on the 'Add Expense' button. Fill in the details of the expense and click 'Save' to store the data."
        },
        {
          id: 2,
          question: "How do I update an expense?",
          answe: "To update an expense, click on the specific expense item from the list. You can edit the details and save the changes."
        },
        {
          id: 3,
          question: "How can I delete an expense?",
          answer: "Swipe left on the expense item you want to delete, and the option to delete it will appear. Confirm to remove the item."
        },
        {
          id: 4,
          question: "How can I download a PDF of my expenses?",
          answer: "Click on the PDF icon next to the expense list to download a PDF report of all expenses."
        },
        {
          id: 5,
          question: "How can I add credits?",
          answer: "To add credits, click on the 'Add Credit' button. Fill in the details of the credit and click 'Save' to store the data."
        },
        {
          id: 6,
        question: "How do I update a credit?",
          answer: "To update a credit, click on the specific credit item from the list. You can edit the details and save the changes."
        },
        {
          id: 7,
          question: "How can I delete a credit?",
          answer: "Swipe left on the credit item you want to delete, and the option to delete it will appear. Confirm to remove the item."
        },
        {
          id: 8,
          question: "How can I download a PDF of my credits?",
          answer: "Click on the PDF icon next to the credit list to download a PDF report of all credits."
        },
        {
          id: 9,
          question: "How do I generate a balance sheet?",
          answer: "Click on the 'Download Balance Sheet' button. This will generate a PDF report showing the total expenses, credits, and the balanced amount."
        },
        {
        id: 10,
          question: "What is the balanced amount?",
          answer: "The balanced amount is the difference between your total expenses and credits. It is automatically calculated and shown in the balance sheet PDF."
        }
      ],
      manageflatsFaq:[
        {
          id: 1,
          question: "How can I update flat details?",
          answer: "As an apartment admin, you can click on the flat details, make necessary updates, and save them. You can edit fields like flat name, mobile number, and tenant or owner details."
        },
        {
          id: 2,
          question: "How can I approve tenant or flat owner requests?",
          answer: "To approve a request, click on the 'Approve' button next to the tenant or flat owner's details. Their status will change to 'Verified' once approved."
        },
        {
          id: 3,
          question: "What details are displayed for each flat?",
          answer: "Each flat shows the flat name, tenant or flat owner's name, mobile number, and role (e.g., tenant or flat owner). You can also see whether they are verified or pending."
        },
        {
          id: 4,
          question: "How do I know if a flat or tenant is verified or pending?",
          answer: "Verification status is indicated by icons next to the flat or tenant. A specific icon represents a verified status, and another icon indicates a pending state."
        },
        {
          id: 5,
          question: "Can I manage tenant or flat owner roles?",
          answer: "Yes, as an apartment admin, you can view the roles (tenant, flat owner, etc.) and take action based on their requests. You can approve or reject their roles by clicking the respective buttons."
        },
        {
          id: 6,
          question: "How do I reject a tenant or flat owner request?",
          answer: "To reject a request, click on the 'Reject' button next to the tenant or flat owner's details. Their status will change to 'Rejected', and they will not be able to access the flat."
        }
      ]
  },
};
