import { Flex, List, Skeleton } from 'antd'
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
        {data && (
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={new Array(20).fill(data).flat()}
            renderItem={(spotlight: Spotlight, index) => (
              <List.Item>
                <SpotlightItem title={spotlight.title + `_${index}`} id={spotlight.id} previewImgBase64={spotlight.preview} />
              </List.Item>
            )}
          />
        )}
      </Wrapper>
    </Flex>
  )
}

//<Flex justify="space-between" align="flex-start" wrap="wrap">
//<SpotlightItem title={spotlight.title + `_${index}`} previewImgBase64={spotlight.preview} />
//    {data &&
//      new Array(20)
//        .fill(data)
//        .flat()
//        .map((spotlight, index) => (
//        ))}
//</Flex>
export default Home
