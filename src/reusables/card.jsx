export default function Card({ imgSrc, id, name, alt, onClick }) {
    return (
        <>
            <div id={id} className="card" onClick={onClick}>
                <div className="img-container">
                    <img src={imgSrc} alt={alt}/>
                </div>
                <p className="name">{name}</p>
            </div>
        </>
    );
}