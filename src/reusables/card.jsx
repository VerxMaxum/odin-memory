export default function Card({ imgSrc, name, alt }) {
    console.log(imgSrc);
    return (
        <>
            <div className="card">
                <div className="img-container">
                    <img src={imgSrc} alt={alt}/>
                </div>
                <p className="name">{name}</p>
            </div>
        </>
    );
}