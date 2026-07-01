import photoImg from "../assets/female-profile.jpg";

const UserCard = ({ user, handleSendRequest }) => {
  const { firstName, lastName, age, gender, about, skills, photoUrl } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm m-10">
      <figure className="">
        <img src={photoUrl || photoImg} alt="profile-image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age + " " + gender}</p>
        <p>{about}</p>
        <p>{skills}</p>
        <div className="card-actions justify-center items-center">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
          <button
            className="btn bg-pink-500"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
