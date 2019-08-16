export default  (req,res,next) => {
  if(!req.userData.is_admin != true){
    return res.status(403).json({
      status : 403,
      message : 'Only admins can perform this action'
    });
  }
  next();
}