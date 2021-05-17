const ActionTypes = {
    UPDATE_SEARCH: "[Search] Update Search",
};

const updateSearch = (data: string) => {
    return {
        type: ActionTypes.UPDATE_SEARCH, // required, unique
        data, // payload (optional)
    };
};

export default { updateSearch, ActionTypes };
