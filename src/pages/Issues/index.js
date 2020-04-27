import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import api from '../../services/api';


import Container from '../../components/Container/index';
import {Loading, Owner, CommiList} from './styles';

export default class Issues extends Component{
    static propTypes = {
        match: propTypes.shape({
            params: propTypes.shape({
                repository: propTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        loading: true,
    }

    async componentDidMount(){
        const {match} = this.props;

        const repoName =  decodeURIComponent(match.params.issue);

        const [repository, issues]= await Promise.all([ //as duas requisiçoes sao feitas juntas, e so passa daqui qund as duas finalziarem
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    per_page:5,
                }
            }),
        ]);

        console.log(repository)
        console.log(issues)

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading:false,
        })
        
    }

    render(){

        const {repository, issues, loading} = this.state;

        if(loading) {
            return <Loading>Carregando</Loading>
        }

        return  (
        <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img src ={repository.owner.avatar_url} alt={repository.owner.login} />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <CommiList>
                {issues.map(issue => (
                  <li key={String(issue.id)}>
                      <img src={issue.user.avatar_url} alt={issue.user.login} />
                      <div>
                          <strong>
                            <a href={issue.html_url}>{issue.title}</a>
                          </strong>
                             <p>{issue.user.login}</p>
                      </div>
                  </li>  
                ))}
            </CommiList>
        </Container>);
    }
}

