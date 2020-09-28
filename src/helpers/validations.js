export const FirstNameValidator = {
  rules: [
    {
      required: true,
      message: "First Name is required!"
    },
    { min: 2, message: "Min First Name length 2 is required!" },
    { max: 255, message: "Max First Name length 255 is required!" }
  ]
};

export const LastNameValidator = {
  rules: [
    {
      required: true,
      message: "Last Name is required!"
    },
    { min: 2, message: "Min Last Name length 2 is required!" },
    { max: 255, message: "Max Last Name length 255 is required!" }
  ]
};

export const CompanyValidator = {
  rules: [
    {
      required: true,
      message: "Company Name is required!"
    },
    { min: 2, message: "Min Company length 2 is required!" }
  ]
};

export const WebsiteValidator = {
  rules: [
    {
      required: true,
      message: "Company website is required!"
    }
  ]
};

export const PhoneValidator = {
  rules: [
    { required: true, message: "Phone Number is required!" },
    { min: 10, message: "Min Phone length 10 is required!" },
    { max: 15, message: "Max Phone length 15 is required!" }
  ]
};

export const BioValidator = {
  rules: [
    { required: true, message: 'Bio is required field' },  
    { min: 250, message: "Min Bio length 250 is required!" }]
};

export const AwardsValidator = {
  rules: [
    { required: true, message: 'Awards is required field' },
    { min: 10, message: "Min Awards length 10 is required!" }
  ]
};

export const InitiativesValidator = {
  rules: [
    { required: true, message: 'Initiatives is required field' },
    { min: 10, message: "Min Initiatives length 10 is required!" },
  ]
};

export const URLValidator = {
  rules: [
    {
      required: true,
      message: "URl is required!"
    },
    {
      whitespace: true,
      message: "URL is not valid!",
      type: "url"
    }
  ]
};