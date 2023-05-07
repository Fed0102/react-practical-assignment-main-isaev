import React from 'react';
import cl from './MyModal.module.css';

const MyModal = ({children, show, setShow}) => {

    const rootClasses = [cl.myModal]

    if (show) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')}
             onClick={() => setShow(false)}>
            <div className={cl.myModalContent}
                 onClick={(e) =>
                     e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;