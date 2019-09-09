export default  (req,res,next) => {
  if(!req.userData.is_mentor){
    return res.status(403).json({
      status : 403,
      error : 'Only mentor can perform this action',
    });
  }else{
    next();
  }
}