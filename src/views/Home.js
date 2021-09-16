import React from 'react'
import LastEvents from '../components/LastEvents'
import pevents from '../asset/pevents.jpg'
import '../css/Home.css'

export const Home = () => {

    return (
        <>
            <div>
                <div>
                    <figure>
                        <figcaption>
                            <img src={pevents} alt="logo" className="logo" width="30%" height="30%" />
                        </figcaption>
                    </figure>
                    <p className="title">Bienvenue sur Paris Events</p>
                    <p className="stitle">L'Application qui permet de rechercher en direct les prcohains évènements Pariisiens</p>
                </div>

                <hr />

                <div>
                    <p className="lastE">Dernier évènement publié:</p>
                </div>

                <LastEvents />

            </div>
        </>
    )
}

export default Home