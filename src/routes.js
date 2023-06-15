import IssueAbout from "./IssueAbout.jsx";
import IssueEdit from "./IssueEdit.jsx";
import IssueList from "./IssueList.jsx";
import IssueReport from "./IssueReport.jsx";
import NotFound from "./NotFound.jsx";

const routes = [
    { path: '/issues/:id?', component: IssueList },
  { path: '/edit/:id', component: IssueEdit },
  { path: '/report', component: IssueReport },
  { path: '/about', component: IssueAbout },
  { path: '*', component: NotFound },
]
export default routes;