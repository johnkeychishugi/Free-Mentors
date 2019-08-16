import User from '../models/user';

const users = new User.User();

const userController = {
  changeToadmin : (req, res) => {
    res.status(200).json({id:req.params.userId,user: req.userData});
  }
}

export default userController;

