import React from "react";

const LotoCompleted = (props) => {
    const { isTicketWon } = props;

    return(
        <div>
            {isTicketWon ? "Wow, you won! Congratulations!" : "You lost, try again!"}
        </div>
    )
}

export default LotoCompleted;