import React from 'react'
import img1 from '../assets/2672252.jpg'
import img2 from '../assets/5860.jpg'
import img3 from '../assets/3255317.jpg'

function Home() {
    return (
        
        <div className="container my-4">
             {/* Inline CSS for uniform image size */}
             <style>{`
                .carousel-img {
                    height: 400px; /* Set desired height */
                    object-fit: cover; /* Crop nicely */
                }

                @media (max-width: 768px) {
                    .carousel-img {
                        height: 250px; /* Smaller height on mobile */
                    }
                }
            `}</style>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img1} className="d-block w-100 carousel-img" alt="First slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={img2} className="d-block w-100 carousel-img" alt="Second slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100 carousel-img" alt="Third slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur nam, recusandae quidem autem illum in natus rerum molestias omnis eaque accusamus illo dolore inventore iure magnam quas dolores cupiditate labore fugit veniam corporis hic non cum? Provident possimus odit consequuntur sunt quaerat! Aliquid similique neque voluptatum eius perspiciatis expedita, distinctio unde ipsam assumenda hic vero eum tenetur vitae provident iusto, iure soluta accusantium, earum cumque. Sit consectetur iusto deserunt! Dolorem explicabo dolores magnam fuga labore, nisi qui at mollitia incidunt nobis ipsam praesentium maxime, quaerat eaque similique consequuntur perferendis voluptatibus ullam eligendi ipsa esse cumque. Eveniet animi neque amet distinctio, eos exercitationem sapiente iure quae adipisci cum. Reiciendis illum atque tenetur quisquam asperiores suscipit nesciunt, molestiae animi nihil, voluptas accusamus blanditiis ut provident perferendis. Enim dolor asperiores laboriosam magnam sed adipisci incidunt explicabo assumenda commodi numquam distinctio dolorem, illum sapiente. Asperiores unde et quasi velit dolorem libero fuga distinctio in officiis necessitatibus labore sequi, magni deleniti consequatur voluptates nobis rem placeat possimus, at beatae assumenda! Voluptatum magni iure, fugit culpa eius deserunt? Hic eveniet quos odit dolor et, maiores repudiandae quis ipsam amet expedita consequuntur perspiciatis facilis suscipit id ut qui magni sunt obcaecati recusandae perferendis iusto quibusdam. Fuga, hic dolore. Facere ad totam saepe dolor voluptatibus neque reiciendis ea aperiam assumenda, repellat repudiandae officiis quidem unde vel quas, debitis iusto iure adipisci obcaecati accusantium corporis sed? Perspiciatis quas dolor tenetur et iure. Ipsam deserunt eveniet quisquam sit incidunt esse. Aut, repellat cumque quasi sit voluptas repudiandae hic veniam fugit nobis quo. Saepe fugit itaque, animi non amet repellendus maxime dolore cum quaerat aspernatur iure a vero soluta velit iste nam corrupti facilis accusamus sapiente placeat dignissimos ipsam deleniti. Numquam distinctio iusto omnis culpa dignissimos, molestias reiciendis vero quasi quaerat dolores quos alias, deserunt eum magnam mollitia aliquam a tempora beatae nisi ut nam accusamus excepturi! Impedit soluta molestias nulla eius ab cumque inventore ullam officiis facere quae nobis harum, expedita fugiat doloribus distinctio quam tenetur illo. Maxime rem atque quibusdam mollitia soluta! Et qui illum expedita! Officiis reprehenderit quidem illum rem, asperiores rerum doloremque quos earum officia labore ducimus accusantium? Ducimus, esse laudantium hic maxime eius similique possimus temporibus amet doloribus aliquam fugiat, voluptatum asperiores voluptate? Corporis tenetur dolor minus possimus nam maiores rem adipisci doloremque vel ducimus saepe, fugit atque error. Iste sequi rem quod alias vero voluptatem deleniti facilis illo laborum? Deleniti sit maiores, pariatur mollitia vel voluptate animi asperiores suscipit quae odit autem odio ad labore! Impedit soluta ratione nostrum totam quo error aperiam omnis unde vero. Non eaque soluta sit odio explicabo, dolorem veniam harum mollitia asperiores, porro modi vitae veritatis nesciunt! Consequuntur vitae eveniet distinctio quod laborum, autem maiores repellat officiis, in explicabo porro ex minima tempora minus nisi quisquam voluptate qui eaque voluptates culpa. Quasi at voluptatem, laudantium cupiditate quidem non? Tempore, officia maxime nostrum illo ratione hic harum esse culpa doloribus nobis aut inventore tempora pariatur fugiat eos odit beatae quaerat vel impedit, adipisci, quam quisquam necessitatibus praesentium. Nesciunt id cupiditate hic, assumenda consequatur repudiandae officiis laudantium sit nostrum totam aliquid fuga sed iste sapiente? Quo illo iste optio porro. Hic at quas modi aperiam dolorum laborum iusto pariatur quisquam incidunt! Aspernatur doloribus id deleniti quia in necessitatibus quis quisquam ab at nemo! Rerum inventore reiciendis soluta officiis iste optio nobis similique dolorum eveniet provident! Quis tenetur vel cupiditate eligendi perferendis minima exercitationem architecto nobis voluptas illo molestias consectetur veritatis dignissimos delectus porro itaque nemo deserunt, soluta, esse vero repudiandae! Officia molestias unde quasi tempora nobis blanditiis perferendis placeat. Maiores obcaecati iste illo inventore repellendus ab vero reiciendis placeat enim dolorem atque ipsam magnam hic, officiis aperiam autem neque asperiores quo itaque alias tempora. Esse dolor enim ducimus labore nihil cum reprehenderit facere autem, aut expedita earum eveniet, consequatur inventore voluptatum beatae modi incidunt libero quisquam architecto rerum molestias veritatis facilis nesciunt cupiditate. Sequi cumque non sed soluta saepe fugiat inventore? Unde minima corrupti cumque, quasi odit quae tempora sunt ipsa quidem! Corporis, unde voluptate iusto maiores ratione quisquam laudantium delectus magni libero hic eius neque consectetur, ea ipsum modi porro laborum alias facere corrupti commodi? Quos illum temporibus ut blanditiis eum dicta, placeat dolor corrupti consequatur iusto! Ipsam labore aperiam velit tenetur rem laudantium officiis iste esse fuga deserunt praesentium possimus libero, ullam, quasi laborum ea sunt porro in reprehenderit! Alias corporis, aspernatur animi unde aliquid eligendi ad debitis blanditiis quam? Voluptas voluptatem facilis provident aut magni quod exercitationem, vel nesciunt et magnam totam consectetur, ducimus laborum, maxime natus nulla! Voluptates blanditiis voluptate reprehenderit laboriosam sequi dolorem eligendi placeat, culpa sunt corrupti vel magnam explicabo rerum, accusamus maiores, exercitationem debitis? Debitis id tenetur eaque quod! Dolore reprehenderit, laboriosam ipsam quos consequuntur debitis nobis, voluptates fuga neque sit veniam voluptatum quibusdam officia sapiente illum! Quaerat eveniet enim, eum perferendis recusandae nesciunt quidem eius nostrum voluptas maiores rerum dolore voluptates, architecto porro! Nemo culpa harum ipsam odit unde earum laborum exercitationem dolore expedita accusamus, fugiat, alias illo deleniti tenetur obcaecati rem deserunt. Laudantium non, ad earum nobis, aut reiciendis sequi suscipit eius quo voluptatibus alias excepturi, harum adipisci consectetur commodi tenetur unde. Nobis nisi provident tempore, saepe molestiae eligendi ipsum velit aperiam. Excepturi repudiandae ipsum vel! Pariatur reiciendis minus eum quibusdam sunt similique velit eveniet obcaecati nesciunt facilis, provident dolores sint, atque accusamus aut! Porro est illo magni blanditiis optio, at velit quos dolore beatae tempora veritatis ipsam dolor minima iusto expedita, dicta, enim repellat magnam molestias fugiat quam? Optio, distinctio, nesciunt sit, perspiciatis exercitationem quis repudiandae atque cum voluptates recusandae in consequuntur. Ipsum natus ex non illum rerum aliquam quis ea veniam magni at labore assumenda est, dolorum sunt eius aspernatur quod. Officia quo reiciendis nobis officiis accusamus perspiciatis cupiditate odit expedita mollitia corporis quos, laborum alias ullam, eligendi sit dolore! Illum obcaecati perferendis, maiores eos impedit earum ut dolorum, minima corporis autem nostrum veniam aliquid iusto quas fugit inventore dolor, sit ipsa ratione provident accusantium sed possimus. Assumenda optio nisi necessitatibus quo accusantium facilis porro nobis, harum molestiae ratione ducimus. Adipisci!</p>
        </div>
    )
}

export default Home
