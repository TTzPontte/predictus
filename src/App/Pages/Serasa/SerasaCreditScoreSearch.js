import React from "react";
import "./SerasaCreditScoreSearch.scss";

function SerasaCreditScoreSearch() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <h1>Serasa Credit Score</h1>
                </div>
            </header>
            <main className="main">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="search-form">
                                <h2>Check your credit score</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="document-number">Document Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="document-number"
                                            placeholder="Enter your document number"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default SerasaCreditScoreSearch;
