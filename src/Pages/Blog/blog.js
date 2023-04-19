import React, { useEffect, useState } from 'react';
import styles from './blog.module.css';
import DefaultView from './DefaultView/defaultView';

function Blog() {

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetch('https://karkhana-server.onrender.com/get-blogs').then(res => res.json())
        .then(data => {
            if (data.status === 'success'){
                setBlogs(data.data);
            }
        }).catch(err => console.log(err));
    }, [])

    console.log(blogs);

    let primaryDisplayBlogs = null;

    if (blogs.length){
        primaryDisplayBlogs = <div className={styles.blogMain}>
            <div className={styles.blogHeaderContainer}>
                <div className={styles.mainBlog1}>
                    <img src={blogs[0].img} alt={blogs[0].title} className={styles.mainBlogImg}/>
                    <div className={styles.mainBlogDetailsContainer}>
                        <a href="" className={styles.bottomSection1Link}>{blogs[0].title}</a>
                        <p className={styles.blogHeaderP}>{blogs[0].date}</p>
                    </div>
                </div>
                <div className={styles.mainBlog2}>
                    <div className={styles.blog2Item}>
                        <img src={blogs[1].img} alt={blogs[1].title} className={styles.mainBlogImg}/>
                        <div className={styles.mainBlogDetailsContainer}>
                            <a href="" className={styles.blogHeaderH3}>{blogs[1].title}</a>
                            <p className={styles.blogHeaderP}>{blogs[1].date}</p>
                        </div>
                    </div>
                    <div className={styles.blog2Item}>
                        <img src={blogs[2].img} alt={blogs[2].title} className={styles.mainBlogImg}/>
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
                                <div className={styles.middleSectionImgContainer}>
                                    <img src={item.img} alt={item.title} className={styles.middleSectionImg} />
                                </div>
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
                        <div className={styles.middleItem2ImgContainer}>
                            <img src={blogs[7].img} alt={blogs[7].title} className={styles.middleItem2Img} />
                        </div>
                        <div className={styles.middleItem2HeaderDetails}>
                            <a href="" className={styles.middleSectionLink}>{blogs[7].title}</a>
                            <p className={styles.middleSectionDate}>{blogs[7].date}</p>
                            <p className={styles.middleItem2Details}>{blogs[7].details}</p>
                        </div>
                    </div>
                    <div className={styles.middleItem2Outro}>
                        {blogs.slice(7, 10).map(item => {
                            return <div key={item._id} className={styles.outroItemContainer}>
                                <div className={styles.outroImgContainer}>
                                    <img src={item.img} alt={item.title} className={styles.outroImg} />
                                </div>
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
                            <img src={blogs[10].img} alt={blogs[10].title} className={styles.bottomSection1Img} />
                            <div className={styles.bottomSection1Details}>
                                <a href="" className={styles.bottomSection1Link}>{blogs[10].title}</a>
                                <p className={styles.blogHeaderP}>{blogs[10].date}</p>
                            </div>
                        </div>
                        <div className={styles.bottomSectionItem2}>
                            <div className={styles.bottomSectionItem2E1}>
                                <div className={styles.bottomSectionItem2E1ImgContainer}>
                                    <img src={blogs[11].img} alt={blogs[10].title} className={styles.bottomSection2Img} />
                                </div>
                                <div className={styles.bottomSection2Details}>
                                    <a href="" className={styles.bottomSection2Link}>{blogs[10].title}</a>
                                    <p className={styles.blogHeaderP}>{blogs[10].date}</p>
                                    <p className={styles.blogHeaderP}>{blogs[10].details}</p>
                                </div>
                            </div>

                            <div className={styles.bottomSectionItem2E1}>
                                <div className={styles.bottomSectionItem2E1ImgContainer}>
                                    <img src={blogs[12].img} alt={blogs[12].title} className={styles.bottomSection2Img} />
                                </div>
                                <div className={styles.bottomSection2Details}>
                                    <a href="" className={styles.bottomSection2Link}>{blogs[12].title}</a>
                                    <p className={styles.blogHeaderP}>{blogs[12].date}</p>
                                    <p className={styles.blogHeaderP}>{blogs[12].details}</p>
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
                            <input type='email' className={styles.input} placeholder='Email Address' />
                            <button className={styles.newsLatterBtn}>Subscribe</button>
                        </div>
                    </div>
                    <p className={styles.newsLatterP}>You can unsubscribe us at any time</p>
                </div>
            </div>
        </div>
    }



    return (
        blogs.length ? primaryDisplayBlogs : <DefaultView />
    )
}

export default Blog
