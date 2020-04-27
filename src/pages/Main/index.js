import React, {Component} from 'react';
import {FaGithub, FaPlusCircle, FaSpinner} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container/index';
import { Form, SubmitButton, List} from './styles';

export default class Main extends Component{
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    //carregar os dados do localStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories){
            this.setState({ repositories: JSON.parse(repositories)});
        }
    }

    // salvar os dados do localStorage
    componentDidUpdate(_, prevState) {
        const {repositories} = this.state;

        if(prevState.repositories !== repositories){
            localStorage.setItem('repositories', JSON.stringify(repositories))
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value }); //salva valor do input na variavel newRepo
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });
        
        const { newRepo, repositories } = this.state;
        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,

        };

        this.setState({
            repositories: [...repositories, data], //os '...' vc esta mantendo as infos do array, ja que no react eh imutavel e n pode dar push
            newRepo: '',
            loading: false,
        });
    };

    render(){
        const {newRepo, repositories, loading} = this.state;
        return (
            <Container>
                <h1>
                    <FaGithub size={25}/>
                    Repositórios
                </h1>
    
                <Form onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    placeholder="Adicionar repositório"
                    value= {newRepo}
                    onChange={this.handleInputChange}
                     />
    
                     <SubmitButton loading={loading}>
                        { loading ? 
                        (<FaSpinner color="FFF" size={14}/>
                        ) : (
                        
                        <FaPlusCircle color="FFF" size={16}/>
                        )}

                        
                     </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                            <Link to={`/issue/${encodeURIComponent(repository.name)}`}>Detalhes I</Link>
                            
                        </li>
                        //encodeURIComponent retira a / como endereço e poe caractere especial para n contar na url
                    ))}
                </List>

            </Container>
        );
    }
}

