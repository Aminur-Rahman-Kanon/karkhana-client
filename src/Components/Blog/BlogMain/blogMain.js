import React, { useEffect, useState, useContext } from 'react';
import styles from './blogMain.module.css';
import BlogTemplate from '../BlogTemplate/blogTemplate';
import { ContextProvider } from '../../Others/AuthContext/authContext';

function BlogMain() {

    const context = useContext(ContextProvider);

    const [blogs, setBlogs] = useState([]);

    const [email, setEmail] = useState('');

    const [emailValidity, setEmailValidity] = useState(true);

    //this hook store the blog data to the blogs state and scroll to the top onLoad
    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://karkhana-server.onrender.com/blog')
        .then(res => res.json())
        .then(data => setBlogs(data.data))
        .catch(err => console.log(err));
    }, [ context.data ])

    //Hook to validate email
    useEffect(() => {
        const timer = setTimeout(() => {
            if (email){
                const check1 = email.includes('@');
                const check2 = email.includes('.com');

                if (check1 && check2){
                    const domain = email.slice(email.indexOf('@')+ 1, email.indexOf('.com'));
                    if (domain.length > 0 ){
                        setEmailValidity(false);
                    }
                    else {
                        setEmailValidity(true);
                    }
                }
                else {
                    setEmailValidity(true);
                }
            }
        }, 1300);
        return () => clearTimeout(timer);
    }, [email])


    let primaryDisplayBlogs = null;

    //in this if block we rendered a random amount of item on 3 different sections
    if (blogs.length){
        primaryDisplayBlogs = <div className={styles.blogMain}>
            <div className={styles.blogHeaderContainer}>
                <div data-testid="intro-blog1" className={styles.mainBlog1}>
                    <a href='' className={styles.mainBlogImgContainer}>
                        <img src={blogs[0].img} alt={blogs[0].title} className={styles.mainBlogImg}/>
                    </a>
                    <div className={styles.mainBlogDetailsContainer}>
                        <a href="" className={styles.bottomSection1Link}>{blogs[0].title}</a>
                        <p className={styles.blogHeaderP}>{blogs[0].date}</p>
                    </div>
                </div>
                <div className={styles.mainBlog2}>
                    <div data-testid="intro-blog2" className={styles.blog2Item}>
                        <a href='' className={styles.mainBlogImgContainer}>
                            <img src={blogs[1].img} alt={blogs[1].title} className={styles.mainBlogImg}/>
                        </a>
                        <div className={styles.mainBlogDetailsContainer}>
                            <a href="" className={styles.blogHeaderH3}>{blogs[1].title}</a>
                            <p className={styles.blogHeaderP}>{blogs[1].date}</p>
                        </div>
                    </div>
                    <div data-testid="intro-blog3" className={styles.blog2Item}>
                        <a href='' className={styles.mainBlogImgContainer}>
                            <img src={blogs[2].img} alt={blogs[2].title} className={styles.mainBlogImg}/>
                        </a>
                        <div className={styles.mainBlogDetailsContainer}>
                            <a href="" className={styles.blogHeaderH3}>{blogs[2].title}</a>
                            <p className={styles.blogHeaderP}>{blogs[2].date}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.middleSectionContainer}>
                <div className={styles.middleSectionItem1}>
                    <div className={styles.middleSectionLabel}>Latest News</div>
                    <div className={styles.middleSectionPosts}>
                        {blogs.slice(3, 7).map(item => {
                            return <div key={item._id} className={styles.middleSectionPost}>
                                <a href="" className={styles.middleSectionImgContainer}>
                                    <img src={item.img} alt={item.title} className={styles.middleSectionImg} />
                                </a>
                                <div className={styles.middleSectionDetailsContainer}>
                                    <a href='' className={styles.middleSectionLink}>{item.title}</a>
                                    <p className={styles.middleSectionDate}>{item.date}</p>
                                    <p className={styles.middleSectionDetails}>{item.details}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className={styles.middleSectionItem2}>
                    <div className={styles.middleSectionLabel}>Editors Pick</div>
                    <div className={styles.middleItem2Header}>
                        <a href="" className={styles.middleItem2ImgContainer}>
                            <img src={blogs[7].img} alt={blogs[7].title} className={styles.middleItem2Img} />
                        </a>
                        <div className={styles.middleItem2HeaderDetails}>
                            <a href="" className={styles.middleSectionLink}>{blogs[7].title}</a>
                            <p className={styles.middleSectionDate}>{blogs[7].date}</p>
                            <p className={styles.middleItem2Details}>{blogs[7].details}</p>
                        </div>
                    </div>
                    <div className={styles.middleItem2Outro}>
                        {blogs.slice(8, 11).map(item => {
                            return <div key={item._id} className={styles.outroItemContainer}>
                                <a hrf="" className={styles.outroImgContainer}>
                                    <img src={item.img} alt={item.title} className={styles.outroImg} />
                                </a>
                                <div className={styles.outroDetailsContainer}>
                                    <a href="" className={styles.middleSectionLink}>{item.title}</a>
                                    <p className={styles.middleSectionDate}>{item.date}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>

            <div className={styles.bottomSectionContainer}>
                <div className={styles.bottomSection1}>
                    <div className={styles.middleSectionLabel}>Popular Post</div>
                    <div className={styles.bottomSection1Items}>
                        <div className={styles.bottomSectionItem1}>
                            <a href='' className={styles.mainBlogImgContainer}>
                                <img src={blogs[11].img} alt={blogs[11].title} className={styles.bottomSection1Img} />
                            </a>
                            <div className={styles.bottomSection1Details}>
                                <a href="" className={styles.bottomSection1Link}>{blogs[11].title}</a>
                                <p className={styles.blogHeaderP}>{blogs[11].date}</p>
                            </div>
                        </div>
                        <div className={styles.bottomSectionItem2}>
                            <div className={styles.bottomSectionItem2E1}>
                                <a href="" className={styles.bottomSectionItem2E1ImgContainer}>
                                    <img src={blogs[12].img} alt={blogs[12].title} className={styles.bottomSection2Img} />
                                </a>
                                <div className={styles.bottomSection2Details}>
                                    <a href="" className={styles.bottomSection2Link}>{blogs[10].title}</a>
                                    <p className={styles.blogHeaderP}>{blogs[12].date}</p>
                                    <p className={styles.blogHeaderP}>{blogs[12].details}</p>
                                </div>
                            </div>

                            <div className={styles.bottomSectionItem2E1}>
                                <a href="" className={styles.bottomSectionItem2E1ImgContainer}>
                                    <img src={blogs[13].img} alt={blogs[13].title} className={styles.bottomSection2Img} />
                                </a>
                                <div className={styles.bottomSection2Details}>
                                    <a href="" className={styles.bottomSection2Link}>{blogs[13].title}</a>
                                    <p className={styles.blogHeaderP}>{blogs[13].date}</p>
                                    <p className={styles.blogHeaderP}>{blogs[13].details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomSection2}>
                    <div className={styles.middleSectionLabel}>Newsletter</div>
                    <p className={styles.newsLatterP}>Here, I focus on a range of items andfeatures that we use in life without giving them a second thought.</p>
                    <div className={styles.newsLatterContainer}>
                        <div className={styles.newsLatterInput}>
                            <input type='email'
                                   className={styles.input}
                                   placeholder='Email Address'
                                   onChange={(e) => setEmail(e.target.value)} />
                            <button disabled={emailValidity} className={styles.newsLatterBtn}>Subscribe</button>
                        </div>
                    </div>
                    <p className={styles.newsLatterP}>You can unsubscribe us at any time</p>
                </div>
            </div>
        </div>
    }

    return (
        //render blogs item or template if no data found
        blogs.length ? primaryDisplayBlogs : <BlogTemplate />
    )
}

export default BlogMain;
