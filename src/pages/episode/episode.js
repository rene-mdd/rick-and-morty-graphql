import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import {
  Container, Card, Divider, Header, Table
} from 'semantic-ui-react';
import Loading from '../../components/loading/loading';
import Error from '../error';
import GET_EPISODE from '../../graphql/queries/getEpisode';

function Episode({ match }) {
  const episodeId = Number(match.params.id);
  const { loading, error, data } = useQuery(GET_EPISODE, {
    variables: { id: episodeId }
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <Container>
      {data ? (
        <Card centered>
          <Card.Content textAlign='center'>
            <Card.Header>{data.episode.name}</Card.Header>
            <Card.Meta>
              <p>Air date: {data.episode.air_date}</p>
            </Card.Meta>
            <Divider />
            <Card.Description>
              <p>Episode number: {data.episode.episode}</p>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {/* <p>Species <span style={{ color: '#CFAF7B' }}>{data.episode.species}</span></p> */}
          </Card.Content>
        </Card>
      ) : (
        null
      )}
      <Container>
        <Header as='h2'>Appearing characters</Header>
        <Table unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Origin</Table.HeaderCell>
              <Table.HeaderCell>Species</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data ? (
              data.episode.characters.map((character) => (
                <Table.Row key={character.id}>
                  <Table.Cell>{character.name}</Table.Cell>
                  <Table.Cell>{character.origin.name}</Table.Cell>
                  <Table.Cell>{character.species}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell>Loading...</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </Container>
  );
}

const episodeWrapper = graphql(GET_EPISODE)(Episode);
export default episodeWrapper;

// PropTypes

Episode.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
};

Episode.defaultProps = {
  match: 1
};
