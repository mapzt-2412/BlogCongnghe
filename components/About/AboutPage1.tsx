import React, {memo, useState} from 'react';
import Image from 'next/image';

const data = [
    {
        image: "/about.jpg",
        content: "Hiện nay, các trang blog về công nghệ bằng tiếng Anh xuất hiện khá nhiều trên không gian mạng, nhưng đối với các đối tượng độc giả không giỏi ngoại ngữ thì đây hiển nhiên là một trở ngại rất lớn. Vì lẽ đó, các trang blog công nghệ bằng tiếng Việt được viết bởi những người có kinh nghiệm trong ngành, cũng nổi lên nhiều hơn nhằm mục"
    },
    {
        image: "/about.jpg",
        content: "Hiện nay, các trang blog về công nghệ bằng tiếng Anh xuất hiện khá nhiều trên không gian mạng, nhưng đối với các đối tượng độc giả không giỏi ngoại ngữ thì đây hiển nhiên là một trở ngại rất lớn. Vì lẽ đó, các trang blog công nghệ bằng tiếng Việt được viết bởi những người có kinh nghiệm trong ngành, cũng nổi lên nhiều hơn nhằm mục"
    },
    {
        image: "/about.jpg",
        content: "Hiện nay, các trang blog về công nghệ bằng tiếng Anh xuất hiện khá nhiều trên không gian mạng, nhưng đối với các đối tượng độc giả không giỏi ngoại ngữ thì đây hiển nhiên là một trở ngại rất lớn. Vì lẽ đó, các trang blog công nghệ bằng tiếng Việt được viết bởi những người có kinh nghiệm trong ngành, cũng nổi lên nhiều hơn nhằm mục"
    },
    {
        image: "/about.jpg",
        content: "Hiện nay, các trang blog về công nghệ bằng tiếng Anh xuất hiện khá nhiều trên không gian mạng, nhưng đối với các đối tượng độc giả không giỏi ngoại ngữ thì đây hiển nhiên là một trở ngại rất lớn. Vì lẽ đó, các trang blog công nghệ bằng tiếng Việt được viết bởi những người có kinh nghiệm trong ngành, cũng nổi lên nhiều hơn nhằm mục"
    },
]
const AboutPage1 = ({page}) => {

    return (
        <div className="about-container">
                    <div className="about-left">
                        <Image src={data[page-1].image} layout="responsive" width={341} height={450} alt='about'/>
                    </div>
                    <div className="about-right">
                        <p>
                        {
                            data[page-1].content
                        }
                        </p>
                    </div>
                </div>
    )
}
export default memo(AboutPage1);