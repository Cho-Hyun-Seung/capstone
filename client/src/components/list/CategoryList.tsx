import axios, { AxiosResponse } from 'axios'
import { ReactPropTypes, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HorizonLine from '../HorizonLine'
import '../../css/CategoryList.css'

interface Category {
  category_code: string
  category_name: string
  children: Category[]
}

const Categories = ({
  categories,
  onClickCategory,
}: {
  categories: Category[]
  onClickCategory: (category: Category) => void
}) => {
  return (
    <div className='category-scroll'>
      {categories.map((category: Category) => (
        <div
          key={category.category_code}
          onClick={() => onClickCategory(category)}
          className='category-element'
        >
          {category.category_name}
          <HorizonLine />
        </div>
      ))}
    </div>
  )
}

const CategoryList = () => {
  const [level1, setLevel1] = useState<Category[]>([])
  const [level2, setLevel2] = useState<Category[]>([])
  const [level3, setLevel3] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  // 현재 선택된 카테고리 state값 추가하기!

  // 전체 선택 기능 --> 재사용성?

  // 루트 카테고리 가져오기
  const getRootCategory = async () => {
    const response: AxiosResponse = await axios.get('/api/category/root')
    setLevel1(response.data)
  }

  const onClickCategory = async (category: Category) => {
    try {
      const response: AxiosResponse = await axios.get(
        `/api/category/getdescendants/${category.category_code}`
      )
      // API 호출 성공 시, 원하는 작업 수행
      console.log(response.data) // API 응답 데이터 확인
      if (level1.includes(category)) {
        setLevel2(response.data)
        setLevel3([])
      }
      if (level2.includes(category)) {
        setLevel3(response.data)
      }
    } catch (error) {
      // API 호출 실패 시, 에러 처리
      console.error('Error fetching descendants:', error)
    }
  }

  useEffect(() => {
    getRootCategory()
    // 레벨 1의 카테고리 가져오기
  }, [])

  return (
    <Container className='category-list'>
      <Categories categories={level1} onClickCategory={onClickCategory} />
      <Categories categories={level2} onClickCategory={onClickCategory} />
      <Categories categories={level3} onClickCategory={onClickCategory} />
    </Container>
  )
}

export default CategoryList
