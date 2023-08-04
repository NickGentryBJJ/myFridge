import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSavedRecipeNote } from '../../store/savedRecipes';
import './PostIt.css'

const PostIt = ({ recipe }) => {
    const [note, setNote] = useState(recipe.note);
    const dispatch = useDispatch();

    useEffect(() => {
        setNote(recipe.note || "");
    }, [recipe]);

    const handleBlur = () => {
        dispatch(updateSavedRecipeNote(recipe._id, note));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(updateSavedRecipeNote(recipe._id, note));
    // };

    return (
        <div>
            {/* <form onSubmit={handleSubmit}> */}
                <textarea
                    className="note"
                    value={note}
                    placeholder={"...leave a note"}
                    onChange={(e) => setNote(e.target.value)}
                    onBlur={handleBlur}
                />
                {/* <button type="submit">Save Note</button> */}
            {/* </form> */}
        </div>
    );
};

export default PostIt;
