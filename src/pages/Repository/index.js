import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import api from '../../services/api';


import Container from '../../components/Container/index';
import {Loading, Owner, CommiList} from './styles';

export default class Repository extends Component{
    static propTypes = {
        match: propTypes.shape({
            params: propTypes.shape({
                repository: propTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        commits: [],
        loading: true,
    }

    async componentDidMount(){
        const {match} = this.props;

        const repoName =  decodeURIComponent(match.params.repository);

        const [repository, commits]= await Promise.all([ //as duas requisiçoes sao feitas juntas, e so passa daqui qund as duas finalziarem
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/commits`, {
                params: {
                    per_page:5,
                }
            }),
        ]);

        this.setState({
            repository: repository.data,
            commits: commits.data,
            loading:false,
        })
        
    }

    render(){

        const {repository, commits, loading} = this.state;

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
                {commits.map(commit => (
                  <li key={String(commit.author.id)}>
                      <img src={commit.author.avatar_url} alt={commit.author.login} />
                      <div>
                          <strong>
                            <a href={commit.commit.url}>{commit.comments_url}</a>
                          </strong>
                             <p>{commit.author.login}</p>
                      </div>
                  </li>  
                ))}
            </CommiList>
        </Container>);
    }
}

