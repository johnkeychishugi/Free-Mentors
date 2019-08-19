export default  (req,res,next) => {
  if(!req.userData.is_admin){
    return res.status(403).json({
      status : 403,
      error : 'Only admins can perform this action',
    });
  }else{
    next();
  }
}