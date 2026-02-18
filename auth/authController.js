import authentication from './authModel.js';

const authController = async (req, res) => {
  const credentials = req.body;
  // const studentFromDB = authentication.findOne(credentials.rollNo);
  /**
   * we use aggregation for custom quires
   * -> below query is for getting replace of findOne
   */
  const studentFromDB = await authentication.aggregate([
    { $match: { rollNo: credentials.rollNo } },
    { $limit: 1 },
  ]);
  if (studentFromDB.length > 0) {
    if (studentFromDB.password == credentials.password) {
      return res.status(200).json('Login Sucessfull');
    }
  } else {
    return res
      .status(404)
      .json({ message: `User not foung with ${credentials.rollNo}` });
  }
};

export default authController;
