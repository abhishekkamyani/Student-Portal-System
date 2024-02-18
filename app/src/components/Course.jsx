export default function Course({ courseID, name }) {
  const imageUrl = "https://images.unsplash.com/photo-1544830281-1d5169d6b2af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8c3R1ZHkvMjAweDUwMHx8fHx8fDE3MDcyMDM2Nzg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080";
  return (
    <div>
      <div className="card mx-2" style={{ width: "" }}>
        <img src={imageUrl} className="card-img-top" alt="..." style={{ height: 200 }} />
        <div className="card-body">
          <h5 className="card-title">{courseID}</h5>
          <p className="card-text">{name}</p>
        </div>
      </div>
    </div>
  );
}
