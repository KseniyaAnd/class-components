import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {unselectAll} from '../reducers/SearchSlice';

const SelectedItemsFlyout: React.FC = () => {
    const dispatch = useDispatch();
    const selectedItems = useSelector((state: RootState) => state.search.selectedItems);

    const handleDownload = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            selectedItems.map(item => `${item.name},${item.description}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${selectedItems.length}_items.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUnselectAll = () => {
        dispatch(unselectAll());
    };

    return (
        <div className="flyout" style={{padding: '10px', display: 'flex', flexDirection: "column", gap: 5}}>
            <p>{selectedItems.length} items are selected</p>
            <div style={{display: 'flex', gap: 5}}>
                <button onClick={handleUnselectAll}>Unselect all</button>
                <button onClick={handleDownload}>Download</button>
            </div>
        </div>
    );
};

export default SelectedItemsFlyout;
