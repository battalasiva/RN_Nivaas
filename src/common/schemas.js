import * as Yup from 'yup';

export const onboardValidationSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
  apartment: Yup.string().required('Apartment is required'),
  numBlocks: Yup.number().required('Number of blocks is required'),
  numFlatsPerBlock: Yup
    .number()
    .required('Number of flats per block is required'),
  addressLine1: Yup.string().required('Address line 1 is required'),
});
export const onBoardNewApartmentSchema = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Apartment name is required';
  }
  if (!values.totalFlats || values.totalFlats <= 0) {
    errors.totalFlats = 'Total number of flats must be at least 1';
  }
  if (!values.line1) {
    errors.line1 = 'Address Line 1 is required';
  }
  if (!values.line2) {
    errors.line2 = 'Address Line 2 is required';
  }
  if (!values.postalCode) {
    errors.postalCode = 'Postal code is required';
  }
  if (!values.cityId) {
    errors.cityId = 'City is required';
  }
  return errors;
};

export const ValidateEditFlatsSchema = (setErrors,selectedFlat) => {
  let errorsTemp = {};
  if (!selectedFlat?.flatNo) {
    errorsTemp.flatNo = 'Flat No is required';
  }
  if (!selectedFlat?.name) {
    errorsTemp.name = 'Name is required';
  }
  if (!selectedFlat?.contactNumber) {
    errorsTemp.contactNumber = 'Contact Number is required';
  } else if (!/^\d+$/.test(selectedFlat?.contactNumber)) {
    errorsTemp.contactNumber = 'Invalid Contact Number';
  }
  setErrors(errorsTemp);
  return Object.keys(errorsTemp).length === 0; 
};

export const validateComplaintFields = (title, complaintText,assignedAdmin) => {
  let errors = {};

  if (title?.trim() === '') {
    errors.titleError = 'Title is a mandatory field';
  }
  if (complaintText?.trim() === '') {
    errors.complaintTextError = 'Complaint description is a mandatory field';
  }
  if (assignedAdmin === '') {
    errors.assignedAdminError = 'Admin is Mandatory';
  }
  return errors;
};


export const validatePrepaidMeterFields = (meterName, description, costPerUnit) => {
  let valid = true;
  let errors = {};

  if (!meterName.trim()) {
    errors.meterName = 'Meter Name is required';
    valid = false;
  }

  if (!description.trim()) {
    errors.description = 'Description is required';
    valid = false;
  }

  if (!costPerUnit.trim()) {
    errors.costPerUnit = 'Cost Per Unit is required';
    valid = false;
  } else if (isNaN(costPerUnit) || parseFloat(costPerUnit) <= 0) {
    errors.costPerUnit = 'Cost Per Unit must be a positive number';
    valid = false;
  }

  return { valid, errors };
};

export const validateflatOwnersDetails = (flatDetails,setErrors) => {
  const newErrors = {};
  if (!flatDetails?.flatNo) {
    newErrors.flatNo = 'Flat number is required';
  }
  if (!flatDetails?.ownerPhoneNo) {
    newErrors.ownerPhoneNo = 'Owner phone number is required';
  } else if (flatDetails?.ownerPhoneNo.length !== 10) {
    newErrors.ownerPhoneNo = 'Owner phone number must be 10 digits';
  }
  if (!flatDetails?.ownerName) {
    newErrors.ownerName = 'Owner name is required';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

export const validateFlats = (blockNumbers,setErrors,errors) => {
  let isValid = true;
  const updatedErrors = errors ? [...errors] : [];

  blockNumbers?.forEach((block, index) => {
    if (!block?.trim()) {
      updatedErrors[index] = 'Block number cannot be empty';
      isValid = false;
    } else if (blockNumbers?.filter(b => b === block)?.length > 1) {
      updatedErrors[index] = 'Block already exists';
      isValid = false;
    } else {
      updatedErrors[index] = '';
    }
  });

  setErrors(updatedErrors);
  return isValid;
};
export const ExpancesValidation = (date, transactionType, description, amount) => {
  const errors = {};

  if (!date) {
    errors.date = 'Please select a date.';
  }

  if (!transactionType) {
    errors.transactionType = 'select transaction type.';
  }

  if (!description) {
    errors.description = 'Please enter a description.';
  }

  if (!amount || isNaN(amount)) {
    errors.amount = 'Please enter a valid amount.';
  }

  return errors;
};


export const RegisterValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, 'Minimum 3 Characters required')
    .max(25, 'Maximum 25 Charachers Allow')
    .required('First Name required'),
  lastName: Yup.string().trim().required('Last Name required'),
  phone: Yup.string().trim().required('phone number required'),
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email required'),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});
export const UpdatePasswordValidation = Yup.object({
  currentPassword: Yup.string()
    .trim()
    .required('Password required'),
    newPassword: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('New Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('newPassword'), null], 'Password not Matched'),
    // gotra: Yup.string()
    // .required('Confirm Your Password')
    // .oneOf([Yup.ref('password'), null], 'Enter your Gotra'),

});
export const LoginValidationSchema = Yup.object({
  email: Yup.string().required('Mobile number or Email required'),
  password: Yup.string().trim().required('Password required'),
});


export const forgotPasswordSchema = Yup.object({
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('Password required'),
  confirmPassword: Yup.string()
    .required('Confirm Your Password')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});

export const validateAddApartmentServicePartnerForm = (number, serviceType) => {
  const errors = {};

  // Check if mobile number is provided and has at least 10 digits
  if (!number) {
    errors.number = 'Mobile number is required';
  } else if (number.length < 10) {
    errors.number = 'Mobile number must be at least 10 digits';
  }

  // Check if a service type is selected
  if (serviceType.length === 0) {
    errors.serviceType = 'Service type is required';
  }

  return errors;
};
export const validateRentSaleFields = (fields) => {
  const errors = {};

  if (!fields.noOfRooms || isNaN(fields.noOfRooms) || fields.noOfRooms <= 0) {
      errors.noOfRooms = 'Please enter a valid number of rooms.';
  }

  if (!fields.sqFeet || isNaN(fields.sqFeet) || fields.sqFeet <= 0) {
      errors.sqFeet = 'Please enter a valid square feet value.';
  }

  if (!fields.floorNo || isNaN(fields.floorNo) || fields.floorNo <= 0) {
      errors.floorNo = 'Please enter a valid floor number.';
  }

  if (!fields.parkingAvailable) {
      errors.parkingAvailable = 'parking availability.';
  }

  if (!fields.facing) {
      errors.facing = 'facing direction.';
  }

  return errors;
};

