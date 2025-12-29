import { useNavigate } from "react-router-dom";
import "../../css/Home.css";

import home1 from "../../assets/home1.png";
import home2 from "../../assets/home2.png";
import classe from "../../assets/classe.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-text">
          <h2>Apprenez l'informatique chez nous</h2>
          <button
            className="hero-button"
            onClick={() => navigate("/dashboard/catalogue")}
          >
            Découvrir
          </button>
        </div>

        <div
          className="hero-image"
          style={{ backgroundImage: `url(${home1})` }}
        />
      </section>

      {/* A PROPOS */}
      <section className="about-section">
        <div
          className="about-image"
          style={{ backgroundImage: `url(${home2})` }}
        />

        <div className="about-text">
          <p>
            TXLFORMA est une plateforme de formation en ligne privée conçue pour
            vous faire monter en compétences rapidement et efficacement.
            Nos formations sont professionnelles, adaptées au marché et
            dispensées dans un environnement de qualité avec un accompagnement
            personnalisé et des classes limitées à 30 apprenants.
          </p>
        </div>
      </section>

      {/* INFO */}
      <section className="info-section">
        <div className="info-text">
          <p>
            Nos salles de formation sont pensées pour le confort et
            l’apprentissage. Les infrastructures modernes permettent un
            apprentissage optimal, favorisant la concentration, l’échange et la
            réussite professionnelle dans le numérique.
          </p>
        </div>

        <div
          className="info-image"
          style={{ backgroundImage: `url(${classe})` }}
        />
      </section>

    </div>
  );
}
