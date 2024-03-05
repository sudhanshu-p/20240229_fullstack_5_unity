// check wheater the length of address is 0 or not
const emptyAddress=(addresses)=>{
    if (addresses.length === 0) {
        return res.status(404).json({ message: "No addresses found" });
      }
}

const basicFieldsCheck=(data)=>{
    //if any of this fields not present then return false
    if (!data.firstName || !data.lastName || !data.streetAddress || !data.state || !data.zipcode) {
        return false
      }
    //   else return true
      return true
}

const validateFields=(data)=>{
    // check first name
    if (data.firstName && (data.firstName.length < 2 || data.firstName.length > 50)) {
        console.log("this1")
        return false
      }
    //   check last name
      if (data.lastName && (data.lastName.length < 2 || data.lastName.length > 50)) {
        console.log("this2")
        return false
      }
    
      if (data.streetAddress && (data.streetAddress.length < 5 || data.streetAddress.length > 255)) {
        console.log("this3")
        return false
      }
    
      if (data.state && data.state.length !== 2) {
        console.log("this4")
        return false
      }
    
      if (data.zipcode && !/^\d{5}$/.test(data.zipcode)) {
        console.log("this5")
        return false
      }
      return true
}



module.exports={emptyAddress,basicFieldsCheck,validateFields}