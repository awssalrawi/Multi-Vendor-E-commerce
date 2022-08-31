class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.keyword) {
      const keyword = this.queryStr.keyword
        ? {
            name: {
              $regex: this.queryStr.keyword,
              $options: 'i',
            },
          }
        : {};

      this.query = this.query.find({ ...keyword });
    }
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields from the query
    const removeFields = ['keyword', 'sort', 'limit', 'page', 'fields'];
    // const excludedFields = ['page', 'sort', 'limit', 'fields']
    removeFields.forEach((el) => delete queryCopy[el]);

    // Advance filter for price, ratings etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //   pagination(resPerPage) {
  //     const currentPage = Number(this.queryStr.page) || 1;
  //     const skip = resPerPage * (currentPage - 1);

  //     this.query = this.query.limit(resPerPage).skip(skip);
  //     return this;
  //   }

  sort() {
    //*Sorting

    if (this.queryStr.sort) {
      // console.log(typeof req.query.sort);
      // mongoose do this job
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query.sort('-_id');
    }
    return this;
  }

  //*field limiting.
  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      //console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //__v for including while -__v is for execluding
    }
    return this;
  }

  pagination() {
    //*pagination
    //page=2&limit=10  1-10 page_1  11-20 page_2  21-30 page_3
    const page = this.queryStr.page * 1 || 1; //by default  it is 1
    const limit = this.queryStr.limit * 1 || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  // pagination(resPerPage) {
  //   const currentPage = Number(this.queryStr.page) || 1;
  //   const skip = resPerPage * (currentPage - 1);
  //   this.query = this.query.limit(resPerPage).skip(skip);
  //   return this;
  // }
}

module.exports = APIFeatures;
