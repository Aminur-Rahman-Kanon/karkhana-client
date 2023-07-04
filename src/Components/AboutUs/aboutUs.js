import React from 'react';
import styles from './aboutUs.module.css';
import header from '../../Assets/AboutUs/about.jpg';
import admin from '../../Assets/AboutUs/admin.jpg';
import team1 from '../../Assets/AboutUs/team1.jpg';
import team2 from '../../Assets/AboutUs/team2.jpg';
import team3 from '../../Assets/AboutUs/team3.jpg';
import signature1 from '../../Assets/AboutUs/signature1.png';
import signature2 from '../../Assets/AboutUs/signature2.png';

function aboutUs() {
  return (
    <div className={styles.aboutUsMain}>
        <div className={styles.aboutUsHeaderContainer}>
            <div className={styles.aboutUsHeaderBg}>
                <img data-testid="about-us-intro-1" src={ header } alt="karkhana" className={styles.aboutUsHeaderBgImg}/>
            </div>

            <div className={styles.aboutUsHeaderTitleContainer}>
                <h2 className={styles.aboutUsHeaderTitleHeader}>THE FASHION GUIDE TO SUMMER TRAVEL</h2>
                <a href="" className={styles.aboutUsLink}>READ MORE</a>
            </div>
        </div>

        <div className={styles.middlePartContainer}>
            <div className={styles.middlePartHeader}>
                <h2 className={styles.middlePartH2}>OUR STORY</h2>
                <div className={styles.middlePartDetails}>
                    <p className={styles.middlePartP}>Mollit ullamco magna eiusmod non sit cupidatat.Minim eu ipsum labore eu ad occaecat culpa.Irure fugiat anim ad dolore mollit ipsum non laboris ex nulla irure enim aute magna.Sunt ad in commodo non amet nulla id.Dolore labore sint anim ad officia.Sint ut consequat consequat tempor ullamco velit Lorem ex.Ea enim deserunt nisi voluptate ullamco duis laborum laboris est eu ex velit sunt dolore.Excepteur incididunt consequat amet pariatur nulla dolore commodo proident officia.Sunt dolore id quis incididunt enim non et est ullamco pariatur officia eiusmod.In commodo Lorem consectetur amet aliquip ex minim laboris.</p>
                    <div className={styles.signatureContainer}>
                        <div className={styles.signatureItem}>
                            <img src={signature1} alt='karkhana' className={styles.signature} />
                            <h4 className={styles.middlePartH4}>Person 1</h4>
                            <p className={styles.middlePartP}>Co-Dounder</p>
                        </div>

                        <div className={styles.signatureItem}>
                            <img src={signature2} alt='karkhana' className={styles.signature} />
                            <h4 className={styles.middlePartH4}>Person 2</h4>
                            <p className={styles.middlePartP}>Manager</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.middlePartImgContainer}>
                <img data-testid="about-us-intro-2" src={admin} alt="karkhana" className={styles.middlePartImg} />
            </div>
        </div>

        <div className={styles.bottomPartContainer}>
            <div className={styles.bottomPartHeader}>
                <h2 className={styles.bottomPartHeading}>ABOUT KARKHANA</h2>
                <p className={styles.bottomPartP}>Veniam ipsum veniam Lorem minim nostrud ut eiusmod minim.Aliquip quis ut voluptate nisi.Irure consectetur in sint sint aute consequat incididunt est.Deserunt eiusmod officia sint deserunt nisi occaecat elit fugiat exercitation duis.Proident et sit fugiat sit in labore pariatur.</p>
            </div>

            <div className={styles.teamMemberContainer}>
                <div className={styles.teamMember}>
                    <div className={styles.teamMemberImgContainer}>
                        <div className={styles.outerDiv}>
                            <div className={styles.imgContainer}>
                                <img data-testid="about-us-author-1" src={team1} alt="karkhana" className={styles.teamImg}/>
                                <div className={styles.teamBanner}>Member 1</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.teamMemberDetails}>
                        <h3 className={styles.teamMemberDetailsH3}>OUR MISSION</h3>
                        <p className={styles.bottomPartP}>Cupidatat et pariatur quis dolor consectetur amet amet cillum sint elit ut enim.Quis cupidatat est ad eiusmod.Enim dolor ut in dolor laborum non exercitation occaecat laborum occaecat fugiat in laborum exercitation.Mollit dolore amet sit officia.</p>
                    </div>
                </div>
                <div className={styles.teamMember}>
                    <div className={styles.teamMemberImgContainer}>
                        <div className={styles.outerDiv}>
                            <div className={`${styles.imgContainer} ${styles.item2}`}>
                                <img data-testid="about-us-author-2" src={team2} alt="karkhana" className={styles.teamImg}/>
                                <div className={`${styles.teamBanner} ${styles.banner2}`}>Member 2</div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.teamMemberDetails} ${styles.details2}`}>
                        <h3 className={styles.teamMemberDetailsH3}>OUR VISION</h3>
                        <p className={styles.bottomPartP}>Cupidatat et pariatur quis dolor consectetur amet amet cillum sint elit ut enim.Quis cupidatat est ad eiusmod.Enim dolor ut in dolor laborum non exercitation occaecat laborum occaecat fugiat in laborum exercitation.Mollit dolore amet sit officia.</p>
                    </div>
                </div>
                <div className={styles.teamMember}>
                    <div className={styles.teamMemberImgContainer}>
                        <div className={styles.outerDiv}>
                            <div className={styles.imgContainer}>
                                <img data-testid="about-us-author-3" src={team3} alt="karkhana" className={styles.teamImg}/>
                                <div className={styles.teamBanner}>Member 3</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.teamMemberDetails}>
                        <h3 className={styles.teamMemberDetailsH3}>FROM THE AUTHOR</h3>
                        <p className={styles.bottomPartP}>Cupidatat et pariatur quis dolor consectetur amet amet cillum sint elit ut enim.Quis cupidatat est ad eiusmod.Enim dolor ut in dolor laborum non exercitation occaecat laborum occaecat fugiat in laborum exercitation.Mollit dolore amet sit officia.Ipsum ullamco deserunt laboris mollit labore sit nisi sit laborum culpa fugiat.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default aboutUs
