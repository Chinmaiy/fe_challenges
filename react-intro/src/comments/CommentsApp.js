import React from 'react';
import faker from 'faker';
import ApprovalCard from './ApprovalCard';
import CommentDetail from './CommentDetail';

const CommentsApp = () => {
    return (
        <div className="ui container comments">

            <ApprovalCard contentStyle={{textAlign: 'center'}}>
                Are you sure?
            </ApprovalCard>

            <ApprovalCard>
                <CommentDetail 
                    author="Sam" 
                    date={faker.date.past().toLocaleDateString()} 
                    img={faker.image.avatar()} 
                    text={faker.lorem.sentence()} 
                />
            </ApprovalCard>
            
            <CommentDetail 
                author="Alex" 
                date={faker.date.past().toLocaleDateString()} 
                img={faker.image.avatar()} 
                text={faker.lorem.sentence()} />
            <CommentDetail 
                author = "Jane" 
                date={faker.date.past().toLocaleDateString()} 
                img={faker.image.avatar()} 
                text={faker.lorem.sentence()} />
        </div>
    );
};

export default CommentsApp;