import React from "react";

import withToast from "./withToast.jsx";
import { withRouter } from "react-router-dom";
import { graphqlendpoint } from "./graphqlendppoint.js";
class Search extends React.Component{
    constructor(props){
        super(props);
        this.loadOptions=this.loadOptions.bind(this);
        this.onChangeSelection=this.onChangeSelection.bind(this);
    }
    onChangeSelection({value}){
        const {history}=this.props;
        history.push(`/edit/${value}`);
    }
    async loadOptions(term){
        if(term<3) return [];
        const query = `query IssuesDb($search: String) {
            issueList(search: $search) {
              issuesDb {
                id
                title
              }
            }
          }`;
          const data= await graphqlendpoint(query,{search:term},this.props.showError);
          if(data){
            this.props.showsuccess("Success");
            return data.issueList.issuesDb.map(issue => ({
                label: `#${issue.id}: ${issue.title}`, value: issue.id,
                }));
        }else{
            return []
        }

    }
    render()
{
    return (
        <Dropdown
        instanceId="search-select"
        loadOptions={this.loadOptions}
        onSelect={this.onChangeSelection}
        
        />
    );

}
}

export default withRouter(withToast(Search));