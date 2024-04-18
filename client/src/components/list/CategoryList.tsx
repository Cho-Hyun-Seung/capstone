import axios, { AxiosResponse } from 'axios'
import { ReactPropTypes, useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import HorizonLine from '../HorizonLine'
import '../../css/CategoryList.css'
import { FaTimes } from 'react-icons/fa'

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

const CategoryList = ({ getCategoryArray }: { getCategoryArray: any }) => {
  const [level1, setLevel1] = useState<Category[]>([])
  const [level2, setLevel2] = useState<Category[]>([])
  const [level3, setLevel3] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([])

  const getRootCategory = async () => {
    const response: AxiosResponse = await axios.get('/api/category/root')
    setLevel1(response.data)
  }

  const setCategoryFunction = (category: Category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory([
        ...selectedCategory.filter(
          (v) => v.category_code !== category.category_code
        ),
      ])
    } else {
      setSelectedCategory([...selectedCategory, category])
    }
  }

  const onClickCategory = async (category: Category) => {
    try {
      const response: AxiosResponse = await axios.get(
        `/api/category/getdescendants/${category.category_code}`
      )
      if (level1.includes(category)) {
        setLevel2(response.data)
        setLevel3([])
        setSelectedCategory([])
      }
      if (level2.includes(category)) {
        if (response.data.length == 0) {
          setCategoryFunction(category)
        }
        setLevel3(response.data)
        setSelectedCategory([])
      }
      if (level3.includes(category)) {
        setCategoryFunction(category)
      }
    } catch (error) {
      console.error('Error fetching descendants:', error)
    }
  }

  useEffect(() => {
    getRootCategory()
    // 레벨 1의 카테고리 가져오기
  }, [])

  useEffect(() => {
    getCategoryArray(selectedCategory)
  }, [selectedCategory])

  return (
    <Container className='category-container'>
      <div className='category-list'>
        <Categories categories={level1} onClickCategory={onClickCategory} />
        <Categories categories={level2} onClickCategory={onClickCategory} />
        <Categories categories={level3} onClickCategory={onClickCategory} />
      </div>
      <div>
        {selectedCategory.map((v) => (
          <Button className='selected-category' key={v.category_code}>
            {v.category_name} <FaTimes onClick={() => setCategoryFunction(v)} />
          </Button>
        ))}
      </div>
    </Container>
  )
}

export default CategoryList
