import { Flex, Skeleton } from 'antd'
import styled from 'styled-components'
import useSWR from 'swr'
import SpotlightItem from '../components/spotlight-item'
import { Spotlight } from '../models/spotlight'
import Api, { fetcher } from '../services/APIService'

const Wrapper = styled.div`
  max-width: 1600px;
`

const Home: React.FC = () => {
  const { data, error, isLoading, isValidating } = useSWR<Spotlight[]>(Api.spotlightURL, fetcher)

  return (
    <Flex justify="center">
      <Wrapper>
        {(isLoading || isValidating) && <Skeleton active loading />}
        {error && <div>Failed to load.</div>}

        <Flex justify="space-between" align="flex-start" wrap="wrap">
          {data &&
            new Array(20)
              .fill(data)
              .flat()
              .map((spotlight, index) => <SpotlightItem key={spotlight.id} title={spotlight.title + `_${index}`} previewImgBase64={spotlight.preview} />)}
        </Flex>
      </Wrapper>
    </Flex>
  )
}

export default Home
